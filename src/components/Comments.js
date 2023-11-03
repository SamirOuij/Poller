import React, { useState, useEffect } from 'react';
import firebase from '../index';

const Comments = ({ billId }) => {
  const ref = firebase.firestore().collection('Comments');
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);
  const [commentList, setCommentList] = useState([]);

  function getData() {
    ref.where('billId', '==', billId).onSnapshot((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      setdata(comments);
      setloader(false);
      const newComments = comments.map((newComment) => ({
        username: newComment.username,
        profilePic: newComment.photoURL,
        comment: newComment.newComment,
      }));
      setCommentList(newComments);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const [newComment, setNewComment] = useState('');
  const [username, setusername] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setusername(user.displayName);
        setPhotoURL(user.photoURL);
      }
    });
  }, []);

  function addComment() {
    if (newComment.trim() !== '') {
      ref
        .doc()
        .set({
          billId,
          newComment,
          username,
          photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
      setNewComment('');
    }
  }

  return (
    <div className="comment-section">
      <div className="comment-input-container">
        <textarea
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>
      <div className="comment-list">
        {commentList.map((comment, index) => (
          <div className="comment" key={index}>
            {comment.profilePic ? (
              <img
                className="comment-profile-pic"
                src={comment.profilePic}
                alt="Profile Pic"
              />
            ) : (
              <div className="default-profile-pic">{comment.profilePic}</div>
            )}
            <div className="comment-details">
              <div className="comment-username">{comment.username}</div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
