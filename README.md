# NameMatch
## Project Description
This project aims to match a human name in a list of human names using an AWS Lambda function. The backend is built using Node.js, TypeScript, and Serverless Framework, with integration to OpenAI's API for name embedding.

## Setup Instructions

### Local Setup
1. **Install dependencies:** 
    ```
    npm install
    ```
2. **Build the project:**
    ```
    npm run build
    ```
3. **Run the server locally:**
    ```
    npm start
    ```
    This will start the serverless offline environment, allowing you to test the function locally at [http://localhost:3000/dev/name-match].

### Testing the Deployed Lambda Function
You can test the deployed Lambda function using Postman:

1. **Endpoint URL:**  
   [API Endpoint](https://qjzqsux9sh.execute-api.us-east-1.amazonaws.com/default/NameMatchFunction)

2. **Set the request method to POST and the body to JSON:**
    ```json
    {
      "query": "吴华文"
    }
    ```

3. **Example Response:**
    ```json
    {
      "match": {
        "english": "Huawen Wu",
        "chinese": "华文吴"
      }
    }
    ```

## Deployment
The Lambda function is deployed and accessible via the API Gateway URL provided above. Ensure to set the environment variables and upload the necessary code to AWS Lambda following the steps mentioned in the guide.