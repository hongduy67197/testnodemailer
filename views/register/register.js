$('#registerBtn').on('click', async function(){
    try {
        const email = $('#email').val()
        const username = $('#username').val()
        const password = $('#password').val()
        const confirmPassword = $('#confirm-password').val()
        // console.log(email, username, password, confirmPassword);
        // console.log(email, validate());
        // console.log(username, validateUsername(username));
        // console.log(validatePassPartern(password));
        console.log(checkMatchPass(password, confirmPassword));
        if(checkMatchPass(password, confirmPassword) && validatePassPartern(password) && validate() && validateUsername(username)){
            const res = await $.ajax({
                url: '/user/register',
                type: 'POST',
                data: {email, password, username}
            })

            console.log(res);

        }else{
            $('#result').html(`
                <p>username phai tu 6 - 10 ky tu</p>
                <p>kiem tra email</p>
                <p>password phai co chu hoa chu thuong ky tu dang biet, it nhat 8 ky tu</p>
            `)
        }
    } catch (error) {
        console.log(error);
    }

})

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassPartern = (password) => {
    return password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      );
}

const checkMatchPass = (pass, comfirm) => {
    if(pass === comfirm) return true
    return false
}
  
const validate = () => {
    const $result = $('#result');
    const email = $('#email').val();
    $result.text('');
  
    if (validateEmail(email)) {
        return true
    } 
    return false;
}
  
const validateUsername = (username) => {
    if(username.length >= 6 && username.length <= 10){
        return true
    }
    return false
}