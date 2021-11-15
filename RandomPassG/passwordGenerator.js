//3. create DOM
    const resultEl=document.getElementById('result');
    const lengthEl=document.getElementById('length');

    const upperEl=document.getElementById('uppercase');
    const lowerEl=document.getElementById('lowercase');
    const numberEl=document.getElementById('number');
    const symbolEl=document.getElementById('symbol');
    const generateEl=document.getElementById('generate');

    const clipboardEl = document.getElementById('clipboard');
// 3.end 


// 2. create object for all random generated function 
const randomfunc={
   upper:getRandomUpper,
   lower:getRandomLower,
   number:getRandomNumber,
   symbol:getRandomSymbol
};

// 2.end

// 4.generate event listener 
     
generateEl.addEventListener('click', () => {
      let length=+lengthEl.value;  // it gives string insted of number hence + operator is used before lengthEl
    //   console.log(typeof length);

    let hasupper=upperEl.checked;
    let haslower=lowerEl.checked;
    let hasnumber=numberEl.checked;
    let hassymbol=symbolEl.checked;
    
//    console.log(hasupper,haslower,hasnumber,hassymbol);

    resultEl.innerText=generatePassword(hasupper,haslower,hasnumber,hassymbol,length); // it generate password as per checked

});

// 4.end 

// 5. generate password function as per check

     function generatePassword(upper,lower,number,symbol,length){
       // a. Initialize password variable
       // b. Filter out the unchecked
       // c. loop over length - call generater function for each types
       // d. add final password to the password variable and return in resultEl

       let generatedpw= '';

       const typesCount=upper+lower+number+symbol; // how many types are checked
      //  console.log('types Count',typesCount);


   // let typesArray=[upper,lower,number,symbol]; // in array submit which elements are checked 

// let typesArray=[{upper},{lower},{number},{symbol}]; //using {}(object) to check which are checked(true) or false element both given

let typesArray=[{upper},{lower},{number},{symbol}].filter(  
     item=>Object.values(item)[0]
); // using filter method it gives only checked(true) elements

   // console.log('types Array count',typesArray);
 
    
   // Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArray.forEach(typ => {
			const funcName = Object.keys(typ)[0];
         console.log("functin name :",i, funcName);

			generatedpw += randomfunc[funcName]();
         console.log(generatedpw);
		});
	}
	
	const finalPassword = generatedpw.slice(0, length);//it gives perfect length pw  as per given length
	
	return finalPassword;

}

// 5. end


// 6. copy to clipboard

      clipboardEl.addEventListener('click',() => {
         const textarea=document.createElement('textarea');
         const psw=resultEl.innerText;
     
         if(!psw){
            return;
         }

         textarea.value=psw;
         document.body.appendChild(textarea);
         textarea.select();
         document.execCommand('copy');
         document.body.removeChild(textarea);
         alert("Password Copied to Clipboard");

      });

    // 6 end





//1. Random generator functions

// console.log(String.fromCharCode(97));
//  console.log(Math.floor(Math.random()*26));
//  console.log(String.fromCharCode( Math.floor(Math.random()*26)+97));

 function getRandomUpper(){
     return String.fromCharCode( Math.floor(Math.random()*26)+ 65);  
  }

  function getRandomLower(){
    return String.fromCharCode( Math.floor(Math.random()*26)+ 97);  
 }

 function getRandomNumber(){
    return String.fromCharCode( Math.floor(Math.random()*10)+ 48);  
 }

 function getRandomSymbol(){
    const symbols="!@#$%^&*()<>?/{}.,'" 
    return symbols[Math.floor(Math.random()*symbols.length)];
    
 }
//  console.log(getRandomSymbol());

// 1end
