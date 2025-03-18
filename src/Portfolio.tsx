import { Authenticator } from '@aws-amplify/ui-react';
import "bootstrap/dist/css/bootstrap.min.css";
import '@aws-amplify/ui-react/styles.css';
import Button from "react-bootstrap/Button";

function Portfolio() {

  return (
    <Authenticator>
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Portfolio</h1>
            <p className="text-gray-600 mb-4">Minimalistic, fast, and powerful stock trading.</p>
            <Button className="px-6 py-2 text-lg">Sign out</Button>
        </div>
    </Authenticator>
  );
};

export default Portfolio;
