import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeScreen from './Home';
import UniqueBill from './UniqueBill';
import firebase from '../index';
import '../index.css';

function Bills({ userData }) {
    const { stateName } = useParams();
    const [showUniqueBill, setShowUniqueBill] = useState(false);
    const [billTitle, setBillTitle] = useState('');
    const [billText, setBillText] = useState('');
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        const ref = firebase.firestore().collection("bills");
        let query = ref;

        // Fetch state-specific bills if stateName is provided
        if (stateName) {
            query = query.where('state', '==', stateName);
        }

        // Fetch and set data
        query.onSnapshot((querySnapshot) => {
            const bills = [];
            querySnapshot.forEach((doc) => {
                bills.push({ ...doc.data(), id: doc.id });
            });
            setData(bills);
            setLoader(false);
        });
    }, [stateName]);

    const handleCardClick = (billId) => {
        const selected = data.find((bill) => bill.bill_id === billId);
        if (selected) {
            setSelectedBill(selected);
            setBillTitle(selected.title);
            setBillText(selected.bill);
            setShowUniqueBill(true);
        } else {
            console.error(`Unable to find bill with ID: ${billId}`);
        }
    };

    const handleBackClick = () => {
        setShowUniqueBill(false);
    };

    return (
        <div>
            {!showUniqueBill ? (
                <HomeScreen handleCardClick={handleCardClick} data={data} loader={loader} />
            ) : (
                <UniqueBill 
                    key={selectedBill.id}
                    billId={selectedBill.id}
                    billTitle={selectedBill.clickable_title}
                    billText={selectedBill.summary}
                    userData={userData}
                    handleBackClick={handleBackClick}
                    title={selectedBill.title}
                    cosponsors={selectedBill.cosponsors}
                    actionDate={selectedBill.action_date}
                    actionDesc={selectedBill.action_desc}
                    originalChamber={selectedBill.chamber}
                    currentChamber={selectedBill.current_chamber}
                    url={selectedBill.url}
                />
            )}
        </div>
    );
}

export default Bills;
