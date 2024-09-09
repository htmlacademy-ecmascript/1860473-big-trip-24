import {getRandomItem} from '../src/util.js';

const point = [
  {
    "id": "def202e5-dbfc-4105-9de8-19294519743c",
    "basePrice": 8579,
    "dateFrom": "2024-10-24T06:37:09.899Z",
    "dateTo": "2024-10-24T13:03:09.899Z",
    "destination": "039f3178-3015-46b2-a395-fa26efb2015c",
    "isFavorite": true,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "f5a0fcb0-066d-4c5c-845e-fb141d02e6ad",
    "basePrice": 1294,
    "dateFrom": "2024-10-25T18:41:09.899Z",
    "dateTo": "2024-10-27T09:05:09.899Z",
    "destination": "3a3146cf-f88f-4d1e-8bed-7eb6cef145c8",
    "isFavorite": true,
    "offers": [
      "dec3c29a-c5ad-4388-b49c-c1f1455f0d03",
      "2019ab0e-4e4e-4252-b9c0-d3a9f4db2923",
      "b2006f18-828a-47e7-8b36-48560d825b83"
    ],
    "type": "bus"
  },
  {
    "id": "a57e786a-bfb2-4541-9459-ff8e259a1e42",
    "basePrice": 1619,
    "dateFrom": "2024-10-28T15:57:09.899Z",
    "dateTo": "2024-10-29T03:09:09.899Z",
    "destination": "e2ddfcc3-a9b8-4db6-a811-a3828d2a829c",
    "isFavorite": true,
    "offers": [
      "71ae9618-d5a0-4d77-9d13-7f26805e176c"
    ],
    "type": "drive"
  },
  {
    "id": "7f4c17bf-0002-430f-9b35-090689cc9d1f",
    "basePrice": 6096,
    "dateFrom": "2024-10-30T12:44:09.899Z",
    "dateTo": "2024-11-01T12:11:09.899Z",
    "destination": "7aa8ddd3-9ebe-45cf-8456-5377802ac252",
    "isFavorite": false,
    "offers": [
      "b8529b05-414e-414f-98c4-fc46a0a36ef8",
      "ac05e5bb-729e-41c4-b1cf-71087cd46806"
    ],
    "type": "flight"
  },
  {
    "id": "856ae9a4-07ca-4e19-81a9-18aa7b412076",
    "basePrice": 3295,
    "dateFrom": "2024-11-03T06:31:09.899Z",
    "dateTo": "2024-11-04T03:00:09.899Z",
    "destination": "363aa35f-8cee-48da-9ff8-6d0d6c54d9b0",
    "isFavorite": true,
    "offers": [
      "fc347484-63f4-4b73-9dcd-805ad2192d1e",
      "f2c35098-c7cc-4870-81f8-24bbcbbd2eec",
      "0c3d09c7-3750-4ae0-89f0-b405e76ad1ed"
    ],
    "type": "train"
  },
  {
    "id": "8c5f8f82-35d0-467d-bf60-005ebb30985d",
    "basePrice": 3850,
    "dateFrom": "2024-11-04T13:18:09.899Z",
    "dateTo": "2024-11-06T11:45:09.899Z",
    "destination": "5052c42d-c848-4f5a-bc0e-1c7a9159b55b",
    "isFavorite": true,
    "offers": [],
    "type": "drive"
  },
  {
    "id": "6639dffd-68dd-47f7-b233-40ddca4cf601",
    "basePrice": 9841,
    "dateFrom": "2024-11-07T20:59:09.899Z",
    "dateTo": "2024-11-08T03:18:09.899Z",
    "destination": "363aa35f-8cee-48da-9ff8-6d0d6c54d9b0",
    "isFavorite": false,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "f6cff5df-c2e1-4039-b924-0403195c07f0",
    "basePrice": 5566,
    "dateFrom": "2024-11-08T14:35:09.899Z",
    "dateTo": "2024-11-09T18:25:09.899Z",
    "destination": "238dfde9-12df-43f3-ae52-52145715e238",
    "isFavorite": false,
    "offers": [
      "c2eae7b6-f4af-4a00-a4fe-f8a34e275ed3",
      "b8529b05-414e-414f-98c4-fc46a0a36ef8",
      "ac05e5bb-729e-41c4-b1cf-71087cd46806"
    ],
    "type": "flight"
  },
  {
    "id": "67916aa7-5f3f-4457-97d1-566186b281ca",
    "basePrice": 3925,
    "dateFrom": "2024-11-10T07:54:09.899Z",
    "dateTo": "2024-11-11T03:40:09.899Z",
    "destination": "3a3146cf-f88f-4d1e-8bed-7eb6cef145c8",
    "isFavorite": false,
    "offers": [
      "954cc84d-7283-482a-8b23-67924764294f",
      "9e299604-2f87-45dc-95e9-1edbfd566ab1",
      "82528155-38b1-42dd-ba2d-93f78fec7c89"
    ],
    "type": "taxi"
  },
  {
    "id": "39e7e086-0a0b-4a46-99bf-007cba0717e3",
    "basePrice": 9639,
    "dateFrom": "2024-11-11T21:56:09.899Z",
    "dateTo": "2024-11-13T18:38:09.899Z",
    "destination": "e2ddfcc3-a9b8-4db6-a811-a3828d2a829c",
    "isFavorite": false,
    "offers": [
      "2019ab0e-4e4e-4252-b9c0-d3a9f4db2923",
      "b2006f18-828a-47e7-8b36-48560d825b83"
    ],
    "type": "bus"
  }
];

function getRandomPoint(){
  return getRandomItem(point);
}

export {getRandomPoint};
