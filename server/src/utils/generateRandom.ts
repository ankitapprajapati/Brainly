
export function generateRandom( len:number ){
    let options = "1234567890qwertyuiopasdfghjklzxcvbnm!@#$%^&*()"
    let size = options.length
    let ans="";
    for( let i=0; i<len; i++ ){
        ans+=options[ Math.floor((Math.random()*size)) ] // 0-size
    }
    return ans;
}