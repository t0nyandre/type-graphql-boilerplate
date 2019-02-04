// tslint:disable-next-line
require("dotenv").config();

const { URL, PORT } = process.env;

export const serverURL = PORT ? URL + ":" + PORT : URL;
export const serverPORT = PORT;
