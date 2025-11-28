import React from "react";


interface GreetingProps {
name: string;
messageCount: number;
}


const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
return (
<div>
<h2>Hello {name}!</h2>
<p>You have {messageCount} new messages.</p>
</div>
);
};


export default Greeting;