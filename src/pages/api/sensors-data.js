import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const data = await getSensorData(parseInt(offset), parseInt(limit));
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Errore nel recupero dei dati' });
    }
  }

  /* if (req.method === 'POST') {
    const item = { userId: Date.now().toString(), ...req.body };
    await ddb.send(new PutCommand({ TableName: 'SensorsData', Item: item }));
    return res.status(201).json(item);
  } */
 
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}


async function getSensorData(offset, limit) {
  const params = {
    TableName: 'SensorsData',
    Limit: limit,
    ExclusiveStartKey: offset > 0 ? { id: offset.toString() } : undefined,
  };

  const command = new ScanCommand(params);
  const response = await ddb.send(command);

  return response.Items || [];
}
