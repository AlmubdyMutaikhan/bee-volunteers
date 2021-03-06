import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../hooks/UserContext';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import './Profile.css';
import useFriends from '../../hooks/useFriends';
import axios from 'axios';
import pokemons from './pokemons.json';

const Profile = () => {
    const [id, setID] = useState('loading...');
    const [region, setRegion] = useState('loading...');
    const [about, setAbout] = useState('loading...');
    const [major, setMajor] = useState('loading...');
    const [date, setDate] = useState('loading...');
    const [friends, setFriends] = useState(0);
    const [blogs, setBlogs] = useState(0);
    const [friendsAll, setFriendsAll] = useState([]);
    const {getUser, createPokemons} = useUser();
    const { isAuthenticated } = useAuth();
    const [name, setName] = useState({});
    const [wins, setWins] = useState('loading...');
    const [avatarURL, setAvatarURL] = useState('https://assets.materialup.com/uploads/b68f4460-aaa9-4e19-99d8-232dfea1c537/preview.gif');
    const {getAllFriends} = useFriends();
    const [email, setEmail] = useState('loading...'); 
    const [bloggs, setBloggs ] = useState([]);
    const [isHeroVisible, setHeroVisible] = useState(false);
    const [showList, setShowListHeroes] = useState(false);
    const [hero, setHero] = useState(null);

    const loadFriends = async () => {
        const user = await isAuthenticated();
        
        if(user.status) {
            const friends = await getAllFriends(user.payload.id);
            console.log(friends);
        }

    }


    const createHero = async (name, img) => {
        setHero({name, img, stars:1});
        setShowListHeroes(false);
        try {
            const pokemon = await createPokemons(name, img, id);
            console.log(pokemon); 
        } catch(err) {
            console.log(err.message);
        }
    }
    


    const load = async () => {
        const user = await isAuthenticated();
    
        if(user.status) {
            setID(user.payload.id);
            setName({fname : user.payload.user.fname, sname : user.payload.user.sname});
            const userData = await getUser(user.payload.id);
            console.log(userData);
            setHero(userData.user.hero);
            setAbout(userData.user.about);
            setRegion(userData.user.region);
            setMajor(userData.user.major);
            setDate(userData.user.date);
            setWins(userData.user.wins);
            setAvatarURL(userData.user.avatarURL);
            setFriends(userData.user.friends.length);
            setBlogs(userData.user.blogs.length);
            setEmail(userData.user.email);
            setBloggs(userData.user.blogs);
            
        }
    }




    useEffect(() => {
        load();
    }, []);


    
    return(
        <>
        <div className="profile-container">
            <div className='profile-main-container'>
                <div className='profile-avatar-container'>
                    <img src={avatarURL} />
                </div>
                <div className='profile-metrics-container'>
                    <div className='profile-id-container'>
                        <p>?????????????????? ID</p>
                        <p className='profile-id'>{id}</p>
                    </div>
                    <div className='profile-data-container'>
                        <div className='profile-data-item'>
                        <i className="fad fa-newspaper"></i>
                            <p>??????????</p>
                            <h2>{blogs}</h2>
                        </div>
                        <div className='profile-data-item'>
                            <i className="fad fa-users"></i>
                            <p onClick={()=>{loadFriends();}}>????????????</p>
                            <h2>{friends}</h2>
                        </div>
                        <div className='profile-data-item'>
                        <i className="fas fa-rocket"></i>
                            <p>??????????????</p>
                            <h2>10</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-personal-container'>
                <div className='profile-name-container'>
                    <h1>{name.sname} {name.fname}</h1>
                </div>
                <div className='profile-personal-item-container'>
                    <div className='profile-personal-text'>
                        <h2>???????? ??????????????</h2>
                    </div>
                    <div className='profile-personal-items'>
                        <div className='profile-personal-item'>
                            ?????????? ????????: <span> {date}</span>
                        </div>
                        <div className='profile-personal-item'>
                            ????????: <span>{region}</span>
                        </div>
                        <div className='profile-personal-item'>
                            ??????????: <span>{major}</span>
                        </div>
                        <div className='profile-personal-item'>
                            E-mail: <span>{email}</span>
                        </div>
                        <div className='profile-personal-item'>
                            ??????????????????????: <span>{wins}</span>
                        </div>
                        <br/>
                        <div className='profile-personal-item'>
                            <a href='https://my-pokemon-qwant-app.herokuapp.com/'
                                style={{
                                    background:'blue',
                                    padding:'10px 20px',
                                    marginTop:'50px',
                                    borderRadius:'10px'
                                }}
                            
                            target="_blank">?????????? ???????????????????? (BETA):</a>
                        </div>

                    </div>
                </div>
                <div className='profile-personal-about-container'>
                    <h1>???????? ????????????</h1>
                    <p>{about}</p>
                </div>
                
                <div className='profile-edit'>
                    <NavLink to={'/profile-edit'}>
                        ??????????
                    </NavLink>
                </div>


            </div>
            
        </div>
        
        {
            showList &&
        <div className='create-hero-container-wrapper'>
            <div className='create-hero-container'>
                <div 
                    style={{cursor:'pointer'}}
                    className='heroes-exit'
                    onClick={() => {
                    setShowListHeroes(false);
                }}>
                    <img src={'https://cdn1.iconfinder.com/data/icons/everyday-2/64/x_cross_delete_stop-128.png'}/>
                </div>
                <div className='choose-hero-container'>
                    <h1>???? ???????????????????????????? ????????????????</h1>
                </div>
                <div className='heroes-container'>
                    {pokemons.length > 0 && pokemons.map((val, id) => {

                        return (<div className="card">
                                    <div className="face">
                                        <p>{val.name}</p>
                                        <img 
                                            alt={val.name}
                                            src={val.img ? val.img : 'https://vistapointe.net/images/unknown-2.jpg'}
                                        />
                                    </div>
                                    <div className="content">
                                            <h4>??????: {val.name}</h4>
                                            <br/>
                                            <h4>#{id + 1}</h4>
                                            <p> 
                                                T??????:{val.type}
                                            </p>
                                            <a href='' onClick={(e) => {
                                                e.preventDefault();
                                                createHero(val.name, val.img)
                                            }} className="btn">????????????</a>
                                    </div>
                    
                            </div>)
                    })}
                
                </div>
            </div>
        </div>
        
        }

        { !hero && <div className="my-blog-published-container my-blog-published-container-profile">
                <h1 className="border-bottom">?????????? ???????????????????? (BETA)</h1>
                <div className='no-hero-container'>
                    <img src="https://vistapointe.net/images/unknown-2.jpg"/>
                    
                    <div className='no-hero-text'>
                    <p>?????? ?????? ???? ???????????????????????????? ???????????????? ???????????? :D</p>
                    <p>????????????, ???? ???????? ???????????????????????????? ??????????????????!</p>
                    
                    <p className='create-hero-btn' onClick={() => {
                        setShowListHeroes(true);
                    }}>???????????????????? ????????????</p>
                    </div>
                   
                </div>
        </div>
            }

{hero && <div className="my-blog-published-container my-blog-published-container-profile">
                <h1 className="border-bottom">?????????? ???????????????????? (BETA)</h1>
                <h2 style={{color:'var(--first)'}}>??????: {hero.name}</h2>
                <div className='no-hero-container'>
                    <img src={hero.img}/>
                    <br/>
                    
                    <br/>
                    <div className='progress-bar'>
                        <div className='current-progress'>
                        </div>
                    </div>
                    <h3>{hero.stars+1} / 100 <i className="fas fa-star" style={{color:"var(--first)"}}></i> </h3>
                  
                </div>
                 
                <p style={{
                    marginTop: '-180px',
                    fontWeight:'bold',
                    color:'var(--fourth)'
                }}>
                        
                        ???? ???????????????????????????? ???????????? ?????????????????????????? ?????????????????????????? ????????????, ???????? ?????????? ???????????? ??????????????????
                    </p>
            </div>
            }

        <div className="my-blog-published-container my-blog-published-container-profile">
                <h1 className="border-bottom">???????????? ??????????????????</h1>
                <div className="my-blog-published-items-container">
                    { bloggs && bloggs.map((blog, key) => (
                         <div className="my-blog-pub-item" key={key}>
                         <div className="my-blog-pub-avatar">
                                <NavLink to={'/blogs/' + blog._id}>
                                    <img src={blog.img} />
                                 </NavLink>
                             <p className="my-blog-pub-intro">
                                {blog.desc}
                             </p>
                         </div>
                         <div className="my-blog-pub-desc">
                             <h3 className="my-blog-title">{blog.title}</h3>
                             <div className="my-blog-pub-metrics">
                                 <div className="my-blog-pub-metrics-item">
                                     <i className="fas fa-heart" style={{color:'red'}}></i>
                                     <h3>{blog.likes}</h3>
                                 </div>
                                 <div className="my-blog-pub-metrics-item">
                                     <i className="fas fa-comment-alt" style={{color:'var(--fourth)'}}></i>
                                     <h3>10</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                    )) }
                   
                </div>
            </div>
        </>
        
    )
}

export default Profile;