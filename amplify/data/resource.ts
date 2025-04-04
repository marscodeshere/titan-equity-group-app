import { a, defineData,type ClientSchema } from "@aws-amplify/backend";


const schema = a.schema({
  Stock: a
    .model({
      id: a.id().required(),
      name: a.string(),
      price: a.string(),
      symbol: a.string(),
      change: a.string(),
      dayChange: a.string(),
      volume: a.string(),
      value: a.string(),
      last: a.string(),
      mentions: a.string(),
    })
    .identifier(['id'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group("Admins").to(['create','update']),
    ]),
  Market: a
    .model({
      time: a.time(),
      value: a.float(),
      date: a.date(),
      close: a.time(),
      open: a.time(),
    }).authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group("Admins").to(['create']),
    ]),
  Event: a
    .model({
      eventId: a.id().required(),
      date: a.datetime(),
      event: a.string(),
      forecast: a.string(),
      previous: a.string(),
    })
    .identifier(['eventId'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group("Admins").to(['create']),
    ]),
  Portfolio: a
    .model({
      value: a.string().default("0.00"),
      balance: a.string().default("0.00"),

    }).authorization((allow) => [
        allow.owner().to(["create", "read"]),
    ]),
  Transaction: a
    .model({
      transactionId: a.id().required(),
      type: a.string(),
      amount: a.string(),
      date: a.date(),
      stock: a.string(),
      owns: a.boolean().default(false),

    })
    .identifier(['transactionId'])
    .authorization((allow) => [
      allow.owner().to(['read','create']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
