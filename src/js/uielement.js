import { format } from "date-fns";

export function UiElement(divele){

    const userInfoEle = (data)=>{

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime = data.metadata.creationTime;

        // const getdate = new Date(createdtime).getDate();
        // const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        // const getmonth = new Date(createdtime).getMonth();
        // const getyear = new Date(createdtime).getFullYear();
        // const formateddate = `${getdate} ${month[getmonth]} ${getyear}`;

        const formateddate = format(new Date(createdtime),"do MM yyyy")
        // console.log(formateddate);

        const html = `
            <img src="${photourl}" width="100" alt="profile icon">
            <p>UID : ${uid}</p>
            <p>Display Name : ${fullname}</p>
            <p>Email : ${email}</p>
            <p>Create At : ${formateddate}</p>
        `;

        divele.innerHTML = html;

    }

    return {userInfoEle};

}