import React from "react";

function WebhookDemo() {
  const postJsonData = async () => {
    try {
      const response = await fetch(
        "https://webhook.site/cc725640-67a5-4d4f-ba48-3389c0e576ed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            key1: "myusername",
            email: "mymail@gmail.com",
            name: "Isaac",
            lastname: "Doe",
            age: 27
          })
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      console.log("Response from webhook:", data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  return (
    <div className="card m-3 p-4">
      <h3>Exercise 4 : Post JSON Data</h3>
      <button className="btn btn-primary w-100" onClick={postJsonData}>
        Press me to post some data
      </button>
      <p className="mt-2">
        Ouvre la console du navigateur pour voir la réponse, puis retourne sur
        webhook.site pour vérifier la requête.
      </p>
    </div>
  );
}

export default WebhookDemo;
