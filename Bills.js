import React, { useEffect, useState } from 'react';
import HomeScreen from './Home';
import UniqueBill from './UniqueBill';
import firebase from '../index'
import { GoogleAuthProvider } from "firebase/auth";
import '../index.css';


function Bills({userData}) {
    const [showUniqueBill, setShowUniqueBill] = useState(false);
    const [billTitle, setBillTitle] = useState('');
    const [billText, setBillText] = useState('');
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(true)
    const [selectedBill, setSelectedBill] = useState(null); // new state variable

    const ref = firebase.firestore().collection("bills")

    function getData(){
        ref.onSnapshot(querySnapshot => {
        const bills = []
        querySnapshot.forEach((doc) => {
            bills.push({...doc.data(), id: doc.id})
        })
        setdata(bills)
        setloader(false)
        })
    }

    useEffect(() => {
        getData()
    },[])

    const handleCardClick = (billId) => {
        const selectedBill = data.find((bill) => bill.bill_id === billId);
    
        if (selectedBill) {
            setSelectedBill(selectedBill); // set selected bill id
            setBillTitle(selectedBill.title);
            setBillText(selectedBill.bill);
            setShowUniqueBill(true);
        } else {
            console.error(`Unable to find bill with ID: ${billId}`);
        }
    };
    

    const handleBackClick = () => {
        setShowUniqueBill(false);
    };
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            // Handle errors here
            console.log(error);
        });
    };

    return (
        <div>
            {!showUniqueBill ? (
                <HomeScreen handleCardClick={handleCardClick} data={data}/> // pass data to HomeScreen
            ) : (
                <div>
                {loader === false && (data.map((bill) => {
                    if (bill.id === selectedBill.id)
                    { 
                    return (
                                <UniqueBill 
                        key={bill.id} 
                        billId={bill.id} 
                        billTitle={bill.clickable_title} 
                        billText={bill.summary} 
                        userData={userData} 
                        handleBackClick={handleBackClick} 
                        title={bill.title}
                        cosponsors={bill.cosponsors}
                        actionDate={bill.action_date}
                        actionDesc={bill.action_desc}
                        originalChamber={bill.chamber}
                        currentChamber={bill.current_chamber}
                        url={bill.url}
                    />
                    );
                    }
                }))}
                </div>
            )}
        </div>
    );
}

export default Bills;