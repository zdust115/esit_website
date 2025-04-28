import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const data = await getAlerts(parseInt(offset), parseInt(limit));
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Errore nel recupero dei dati' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getAlerts(offset, limit) {
  const params = {
    TableName: 'Alerts',
  };

  const command = new ScanCommand(params);
  const response = await ddb.send(command);

  // Simula l'offset e il limite
  const items = response.Items || [];
  const paginatedItems = items.slice(offset, offset + limit);

  return paginatedItems;
}