import "./App.css";
import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onChildAdded,
} from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setUser({name:result.user.displayName , email:result.user.email})
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(()=>{
        updateHeight();
      },100)
    });
  }, []);

  const [msg, setMsg] = useState("");
  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });

    //const c = [...chats];
    //c.push({ name, message: msg });
    //setChats(c);
    setMsg("");
  };
  return (
    <div className="App">
      {user.email ? null : (
        <div>
          {/*<input
            type="text"
            placeholder="Enter your name"
            onBlur={(e) => setName(e.target.value)}
          ></input>*/}
          <button onClick={e=>{googleLogin()}} >Google SignIn</button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User : {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${c.user.email === user.email ? "me" : ""}`}
              >
                <p className="chatbox">
                  <strong>{c.user.name} : </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              onInput={(e) => setMsg(e.target.value)}
              type="text"
              placeholder="Enter text"
              value={msg}
            ></input>
            <button onClick={(e) => sendChat()}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
