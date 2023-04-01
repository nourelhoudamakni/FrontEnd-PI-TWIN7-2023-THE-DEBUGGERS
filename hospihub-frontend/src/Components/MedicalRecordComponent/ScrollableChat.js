import ScrollableFeed from "react-scrollable-feed"
function ScrollableChat({messages}) {
    return ( 
        <> 
        <ScrollableFeed>
        {Array.isArray(messages) && messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        </ScrollableFeed>
        </>
     );
}

export default ScrollableChat;