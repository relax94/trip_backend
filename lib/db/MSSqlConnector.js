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
                        .query(`select  Email as email, Email as ph_number, UserId as member_id, Photo as icon_url, AboutMe as bio, Firstname as first_name, Lastname as last_name from UserProfiles as up inner join Users on Id = UserId where up.UserId =@input_parameter`)
                        //.query(`select  Email as email, Email as ph_number, UserId as member_id, Photo as icon_url, AboutMe as bio, Firstname as first_name, Lastname as last_name from UserProfiles inner join Users  on Id = UserId`)
                        .then((recordset) => {
                            console.log(recordset);
                            if (recordset.length > 0) {
                                recordset.forEach((element) => {
                                    return MM.addMember(element, (syncResult) => {
                                        console.log("SYNC RESULT : ", syncResult);
                                    });
                                }, this);

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