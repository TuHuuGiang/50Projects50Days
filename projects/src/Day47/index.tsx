import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .box {
    max-width: 768px;
    color: #fff;
    border-radius: 15px;
    background-color: #476ce4;
    padding: 50px 80px;

    .progress-bar {
      background-color: #fff;
      height: 4px;
      width: 100%;
      animation: grow 10s linear infinite;
      transform-origin: left;
    }

    .content {
      font-size: 18px;
      line-height: 28px;
      margin: 16px 0;
      text-align: justify;
    }

    .user {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        border-radius: 50%;
        height: 75px;
        width: 75px;
        object-fit: cover;
        margin-right: 14px;
      }

      .user-detail {
        h4 {
          font-weight: 600;
          font-size: 19px;
          margin-bottom: 6px;
        }
      }
    }
  }

  @keyframes grow {
    0% {
      transform: scaleX(0);
    }
  }
`;

export default function IntroduceUser() {
    const testimonials = [
        {
            name: 'Miyah Myles',
            position: 'Marketing',
            photo:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
            text:
                "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
        },
        {
            name: 'June Cha',
            position: 'Software Engineer',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            text:
                'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
        },
        {
            name: 'Iida Niskanen',
            position: 'Data Entry',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            text:
                "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
        },
        {
            name: 'Renee Sims',
            position: 'Receptionist',
            photo: 'https://randomuser.me/api/portraits/women/65.jpg',
            text:
                "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
        },
        {
            name: 'Jonathan Nunfiez',
            position: 'Graphic Designer',
            photo: 'https://randomuser.me/api/portraits/men/43.jpg',
            text:
                "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
        },
        {
            name: 'Sasha Ho',
            position: 'Accountant',
            photo:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
            text:
                'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
        },
        {
            name: 'Veeti Seppanen',
            position: 'Director',
            photo: 'https://randomuser.me/api/portraits/men/97.jpg',
            text:
                'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
        },
    ]
    let index = 1;
    const [arrUser, setArrUser] = useState<any>([testimonials[index]]);

    useEffect(() => {
        let timer = setInterval(() => {
            updateTestimonial();
        }, 10000);

        return () => {
            clearInterval(timer);
        }
    }, []);


    const updateTestimonial = () => {
        index++
        if (index > testimonials.length - 1) {
            index = 0
        }
        const arr = testimonials[index];
        setArrUser([arr]);
    }

    return (
        <>
            <Container>
                {
                    arrUser.map((user: any, index: number) => (
                        <div className="box" key={index}>
                            <div className="progress-bar"></div>
                            <p className="content">{user.text}</p>
                            <div className="user">
                                <img
                                    src={user.photo}
                                    alt=""/>
                                <div className="user-detail">
                                    <h4>{user.name}</h4>
                                    <p>{user.position}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Container>
        </>
    );
}