async function logout (){
    const id = window.localStorage.getItem('userID')
    console.log('/user/logout/' + id);
    if(id){
        const res =  await $.ajax({
            url:'/user/logout/' + id,
            type:'POST'
        })
        if(res.message=='logout success'){
            window.location.href = '/user/login'
        }
    }else{
        window.location.href = '/user/login'
    }
    
}