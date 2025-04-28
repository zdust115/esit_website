import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
  }
  if (req.method === 'PUT') {
    const { alert_pk } = req.body;

    if (!alert_pk) {
      return res.status(400).json({ error: 'alert_pk è richiesto' });
    }

    try {
      const updatedAlert = await updateAlertState(alert_pk);
      res.status(200).json({ message: 'Stato aggiornato con successo', updatedAlert });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento:', error);
      res.status(500).json({ error: 'Errore durante l\'aggiornamento dello stato' });
    }
  } else{
    res.setHeader('Allow', ['GET', 'PUT']);
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

async function updateAlertState(alert_pk) {
  const params = {
    TableName: 'Alerts',
    Key: { alert_pk },
    UpdateExpression: 'SET #state = :newState',
    ExpressionAttributeNames: {
      '#state': 'state',
    },
    ExpressionAttributeValues: {
      ':newState': 'solved',
    },
    ReturnValues: 'ALL_NEW',
  };

  const command = new UpdateCommand(params);
  const response = await ddb.send(command);
  return response.Attributes;
}