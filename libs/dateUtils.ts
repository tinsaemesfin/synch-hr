import  moment  from 'moment-timezone';
const DateWithTimeZone  = (date:Date) =>{
    return moment.tz(new Date(date),'Africa/Addis_Ababa').format('YYYY-MM-DD HH:mm:ss')
}