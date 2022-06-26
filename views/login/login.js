$('#loginBtn').on('click', async function(){
    try {
        const email = $('#email').val()
        const password = $('#password').val()
        if(validate() && validatePassPartern(password)){
            const res = await $.ajax({
                url: '/user/login',
                type:'POST',
                data: {email, password}
            })
            if(res.status){
                alert(res.status)
            }else{
                window.localStorage.setItem('userID', res.data.userData._id )
                window.location.href = '/user'
            }
        }else{
            $('#result').html(`
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

const validate = () => {
    const $result = $('#result');
    const email = $('#email').val();
    $result.text('');
  
    if (validateEmail(email)) {
        return true
    } 
    return false;
}