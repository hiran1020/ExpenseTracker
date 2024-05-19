import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import { PermissionsAndroid, ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const SMSComponent = ({ onSMSData }) => {
    const [smsData, setSMSData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSMSFromInbox();
    }, []);

    const fetchSMSFromInbox = async () => {
        try {
            setIsLoading(true);

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
                const filter = { box: 'inbox' };

                SmsAndroid.list(
                    JSON.stringify(filter),
                    (fail) => {
                        console.error('Failed to fetch SMS:', fail);
                        setIsLoading(false);
                    },
                    (count, smsList) => {
                        try {
                            const messages = JSON.parse(smsList);
                            const parsedSMSData = parseSMS(messages);
                            setSMSData(parsedSMSData);
                            onSMSData(parsedSMSData);
                        } catch (error) {
                            console.error('Error parsing SMS list:', error);
                        } finally {
                            setIsLoading(false);
                        }
                    }
                );
            } else {
                console.error('SMS permission denied');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching SMS:', error);
            setIsLoading(false);
        }
    };

    const parseSMS = (messages) => {
        const filteredMessages = filterItems(messages);
        return filteredMessages.map((message) => {
            const { _id, body, date } = message;
            let amount = 0;
            let description = '';
            let exptype = 'others';

            const isMobileTopup = body.toLowerCase().includes('service number') && body.toLowerCase().includes('credited for');
            const isDebit = body.toLowerCase().includes('debited');
            const isWithdrawal = body.toLowerCase().includes('withdrawn') || body.toLowerCase().includes('cash withdraw')
            const isPayment = body.toLowerCase().includes('payment successful');

            if (isMobileTopup) {
                const regex = /Service Number (\d+) has been credited for ([\d.]+)Rupees/;
                const match = body.match(regex);
                if (match) {
                    amount = parseFloat(match[2]);
                    description = `Mobile Top-up to: ${match[1]}`;
                    exptype = description;
                }
            } else if (isDebit) {
                const regex = /Debited by NPR ([\d,]+(?:\.\d+)?)/;
                const match = body.match(regex);
                if (match) {
                    amount = parseFloat(match[1].replace(/,/g, ''));
                    description = body;
                    exptype = getTransactionType(body);
                }
            } else if (isWithdrawal) {
                const regex = /Amount: NRP ([\d,]+(?:\.\d+)?)/;
                const match = body.match(regex);
                if (match) {
                    amount = parseFloat(match[1].replace(/,/g, ''));
                    description = body;
                    exptype = getTransactionType(body);
                } else {
                    const generalRegex = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/;
                    const generalMatch = body.match(generalRegex);
                    if (generalMatch) {
                        amount = parseFloat(generalMatch[0].replace(/,/g, ''));
                        description = body;
                        exptype = getTransactionType(body);
                    }
                }
            } else if (isPayment) {
                const regex = /amount (\d{1,3}(?:,\d{3})*(?:\.\d+)?)/;
                const match = body.match(regex);
                if (match) {
                    amount = parseFloat(match[1].replace(/,/g, ''));
                    description = body;
                    exptype = getTransactionType(body);
                }
            } else {
                const regex = /\d+(\.\d+)?/g;
                const amounts = body.match(regex);
                if (amounts) {
                    amount = parseFloat(amounts[0]);
                }
                description = body;
                exptype = getTransactionType(body);
            }

            return {
                id: _id,
                description,
                amount: amount || 0,
                exptype,
                date: new Date(date),
            };
        }).filter(Boolean);
    };

    const filterItems = (messages) => {
        const keywordsRegex = /(debited|number|payment|withdraw|withdrawn)/i;
        return messages.filter((message) => keywordsRegex.test(message.body));
    };

    const getTransactionType = (messageBody) => {
        const keywords = {
            'debited': 'Si-fi',
            'withdraw': 'others',
            'payment': 'Debt',
        };

        const lowercaseMessage = messageBody.toLowerCase();

        for (const keyword in keywords) {
            if (lowercaseMessage.includes(keyword)) {
                return keywords[keyword];
            }
        }

        return 'payment'; // default type if no keyword is matched
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return 
};
export default SMSComponent;