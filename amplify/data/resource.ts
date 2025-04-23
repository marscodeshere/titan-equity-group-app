import { a, defineData,type ClientSchema } from "@aws-amplify/backend";


const schema = a.schema({
  Stock: a
    .model({
      name: a.string(),
      symbol: a.string(),
      price: a.string(),
      change: a.string().default("0"),
      volume: a.string().default("0"),
      value: a.string().default("0"),
      last: a.string().default("0"),
      mentions: a.string().default("0"),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner(),
    ]),
  Markethours: a
    .model({
      value: a.float().default(0.0),
      close: a.string(),
      open: a.string(),
    }).authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner(),
    ]),
  Marketdays: a
    .model({
      closedays: a.string(),
    }).authorization((allow) =>[
      allow.authenticated().to(['read']),
      allow.owner(),      
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
      allow.owner(),
    ]),
  Transaction: a
    .model({
      type: a.string(),
      amount: a.string(),
      date: a.string(),
      stock: a.string(),
      owns: a.boolean().default(false),
      success: a.boolean().default(false),
      stockId: a.string(),
      shares: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
    ]),
  Account: a
  .model({
    accountvalue: a.string().default("0"),
    balance: a.string().default("0"),
  })
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
