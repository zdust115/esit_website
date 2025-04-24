import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method === 'GET') {
console.log('AWS_REGION', process.env.AWS_REGION);

    const data = await ddb.send(new ScanCommand({ TableName: 'SensorsData' }));
    return res.status(200).json(data.Items);
  }
  if (req.method === 'POST') {
    const item = { userId: Date.now().toString(), ...req.body };
    await ddb.send(new PutCommand({ TableName: 'SensorsData', Item: item }));
    return res.status(201).json(item);
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
