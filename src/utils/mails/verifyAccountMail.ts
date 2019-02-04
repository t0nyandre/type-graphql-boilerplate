import { User } from "../../models/User";
import { serverURL } from "../../../config/default";

export const verifyAccountMail = (user: User, token: string) => {
  const mail = {
    from: "Tony André Haugen <no-reply@tonyandre.co>",
    to: user.email,
    subject: `Thank you, ${user.username} for signing up to my website!`,
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n<html lang="en">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<title></title>\n<style type="text/css"></style>\n</head>\n<body style="margin:0;padding:0;background-color:#f2f2f2">\n<center>\n<table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px;width:100%" bgcolor="#FFFFFF">\n<tr>\n<td align="center" valign="top" style="padding:10px">\n<table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px;width:100%">\n<tr>\n<td align="center" valign="top" style="padding:10px">\n<p>\nThank you for signing up to my website.\n</p>\n<p>\nThere is only one more step required to login;\n</p>\n<form action="${serverURL}/user/verify/${token}" target="_BLANK">\n<button style="padding:10px;cursor:pointer;background-color:cyan;font-weight:bold;border:1px solid #222">\nVERIFY ACCOUNT\n</button>\n</form>\n<p style="font-size:9px;margin-top:20px">\nIf the button doesn\'t work for you click <a href="${serverURL}/user/verify/${token}" target="_BLANK">here</a>.\n</p>\n</td>\n</tr>\n</table>\n</td>\n</tr>\n</table>\n</center>\n</body>\n</html>`,
  };
  return mail;
};
