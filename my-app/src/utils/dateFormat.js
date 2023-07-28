function dateFormat(data){
     return new Date(data).getDay() === new Date().getDay()
       ? `${new Date(data).getHours()}:${new Date(data)
           .getMinutes()
           .toString()
           .padStart(2, "0")}`
       : `${new Date(data).getDay()}/${new Date(data).getMonth() + 1}`;
     
}

export default dateFormat;