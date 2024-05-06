import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const SMSComponent = ({ onSMSData }) => {
    useEffect(() => {
        fetchSMSFromInbox();
    }, []);

    const fetchSMSFromInbox = async () => {
        try {
            // Request SMS permission
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: 'SMS Permission',
                    message: 'App needs access to read SMS messages.',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permissions access")
                // Permission granted, fetch SMS messages
                const filter = {
                    box: 'inbox', 
                    // Fetch messages from the inbox
                };

                SmsAndroid.list(
                    JSON.stringify(filter),
                    (fail) => {
                        console.log('Failed to fetch SMS:', fail);
                    },
                    (count, smsList) => {
                        const messages = JSON.parse(smsList);
                        const filteredMessages = filterItems(messages);
                        const regex = /\d+(\.\d+)?/g;

                        //TODO: Search deposited,credited,withdraws,debited
                        const smsData = filteredMessages.map((message) => {
                            const amounts = message.body.match(regex);
                            const amount = amounts ? parseFloat(amounts[0]) : null;
                            const service = amounts ? parseFloat(amounts[1]) : null;

                            if (message.body.toLowerCase().includes('service number')) {
                                return {
                                    id: message._id,
                                    description: "Mobile Top-up to: " + amount,
                                    amount: service,
                                    exptype: "Mobile-Top-up",
                                    date: new Date(message.date),
                                };
                            } else if (message.body.toLowerCase().includes('debited by')) {
                                return {
                                    id: message._id,
                                    description: message.body,
                                    amount: amount,
                                    exptype: "Si-fi",
                                    date: new Date(message.date),
                                };
                            } else if (message.body.toLowerCase().includes('withdraw')) {
                                return {
                                    id: message._id,
                                    description: message.body,
                                    amount: amount,
                                    exptype: "others",
                                    date: new Date(message.date),
                                };
                            } else if (message.body.toLowerCase().includes('payment')){
                                // Handle any other cases here
                                return {
                                    id: message._id,
                                    description: message.body,
                                    amount: amount,
                                    exptype: "Debt", // Or any other default value
                                    date: new Date(message.date),
                                };
                            }
                        });
                

                        
                        // Send the SMS data to the parent component
                        onSMSData(smsData);
                    }
                );
            } else {
                console.log('SMS permission denied');
            }
        } catch (error) {
            console.error('Error fetching SMS:', error);
        }
    };

    const filterItems = (messages) => {
        return messages.filter((message) => {
            const { body } = message;
            return body.toLowerCase().includes('debited') || body.toLowerCase().includes('credited') || body.toLowerCase.includes('deposited') || body.toLowerCase.includes('withdraw') || body.toLowerCase.includes('payment');
        });
    };

    return null; // Or render your component UI here
};

export default SMSComponent;






// data examples
// {
//   "_id": 27,
//   "address": "1415",
//   "advanced_seen": 3,
//   "b2c_ttl": 0,
//   "bind_id": 0,
//   "block_type": 0,
//   "body": "Service Number 9765305469 has been credited for 58.82Rupees, your new balance is 59.84Rupees , Transaction ID:ESEWA0000647101973. -NT",
//   "date": 1672392846947,
//   "date_sent": 1672392838000,
//   "deleted": 0,
//   "error_code": 0,
//   "fake_cell_type": 0,
//   "favorite_date": 0,
//   "locked": 0,
//   "marker": 0,
//   "mx_status": 0,
//   "out_time": 0,
//   "protocol": 0,
//   "read": 1,
//   "reply_path_present": 0,
//   "seen": 1,
//   "service_center": "+9779851028801",
//   "sim_id": 1,
//   "status": -1,
//   "sub_id": 1,
//   "sync_state": 0,
//   "thread_id": 7,
//   "timed": 0,
//   "type": 1,
//   "url_risky_type": 0
// }