
import Link from 'next/link'
import {FaGithub, FaLinkedinIn, FaMedium, FaStackOverflow} from 'react-icons/fa'

interface SocialsProps {
    containerStyles: string;
    iconStyles: string;
}

const socials = [
    {icon: <FaGithub />, path: 'https://github.com/biswajitpanday'},
    {icon: <FaLinkedinIn />, path: 'https://www.linkedin.com/in/biswajitpanday'},
    {icon: <FaMedium />, path: 'https://medium.com/@biswajitpanday'},
    {icon: <FaStackOverflow />, path: 'https://stackoverflow.com/users/2923956/biswajit-panday'}
]

const Socials = ({containerStyles, iconStyles}: SocialsProps) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return (
                    <Link key={index} href={item.path} className={iconStyles} target='_blank'>
                        {item.icon}
                    </Link>
                )
            })}
        </div>
    )
}

export default Socials;