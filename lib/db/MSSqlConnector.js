import sql from 'mssql'
import {MemberManager} from './MemberManager'

const MM = new MemberManager();

export class MSSqlConnector {
    constructor(user, password, dbname) {
        this.connectionString = `mssql://${user}:${password}@smapme.database.windows.net/${dbname}?encrypt=true`;

    }


    synchronize(userId) {
        if (userId != null) {
            sql.connect(this.connectionString)
                .then(() => {
                    new sql.Request()
                        .input('input_parameter', sql.VarChar(255), userId)
                        .query(`select UserId as member_id, Photo as icon_url, Firstname as first_name, Lastname as last_name from UserProfiles where UserId=@input_parameter`)
                        .then((recordset) => {
                            console.log(recordset);
                            if (recordset.length > 0) {
                                return MM.addMember(recordset[0], (syncResult) => {
                                    console.log("SYNC RESULT : ", syncResult);
                                });
                            }
                            else
                                return;
                        }).catch(function (err) {
                            console.log('query err : ', err);
                        });
                })
                .catch((err) => {
                    console.log('on sql connection error : ', err);
                });
        }
    }

};