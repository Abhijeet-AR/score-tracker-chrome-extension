console.log('Opened!');
let user_info = {
    'codechef': 'abhijeet_ar',
    'codeforces': 'abhijeet_ar',
    'spoj': 'abhijeet_ar',
    'interviewbit': 'abhijeet_ar'
}

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

function get_url(platform){
    return 'http://competitive-coding-api.herokuapp.com/api/'+platform+'/'+user_info[platform];
}

async function fill_scores(){
 
    const codeforces_url = get_url('codeforces');
    fetch(codeforces_url)
    .then(response => response.json())
    .then(data =>{
        if(data.status == 'Success')
            document.getElementById('codeforces').textContent = data.rating;
        
        else
        document.getElementById('codeforces').textContent = 'error';
    })
    .catch(() => console.log('Codeforces Error!'));
    
    const codechef_url = get_url('codechef');
    fetch(codechef_url)
    .then(response => response.json())
    .then(data => {
        if(data.status == 'Success')
            document.getElementById('codechef').textContent = data.rank;

        else 
        document.getElementById('codechef').textContent = 'error';
    })
    .catch(() => console.log('Codechef Error!'));

    const spoj_url = get_url('spoj');
    fetch(spoj_url)
    .then(response => response.json())
    .then(data => {
        if(data.points)
            document.getElementById('spoj').textContent = data.points;

        else
        document.getElementById('spoj').textContent = 'error';
    })
    .catch(() => console.log('SPOJ Error!'));

    const interviewbit_url = get_url('interviewbit');
    fetch(interviewbit_url)
    .then(response => response.json())
    .then(data => {
        if(data.status == 'Success')
            document.getElementById('interviewbit').textContent = data.score;
        
        else
            document.getElementById('interviewbit').textContent = 'error';
    })
    .catch(() => 
    {
        console.log('Interviewbit Error');
        document.getElementById('interviewbit').textContent = 'error';
    })
}

fill_scores()