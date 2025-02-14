
import Link from 'next/link'
import {FaGithub, FaLinkedinIn, FaMedium, FaStackOverflow} from 'react-icons/fa'

interface SocialsProps {
    containerStyles: string;
    iconStyles: string;
}

const socials = [
    {icon: <FaGithub />, path: ''},
    {icon: <FaLinkedinIn />, path: ''},
    {icon: <FaMedium />, path: ''},
    {icon: <FaStackOverflow />, path: ''}
]

const Socials = ({containerStyles, iconStyles}: SocialsProps) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return (
                    <Link key={index} href={item.path} className={iconStyles}>
                        {item.icon}
                    </Link>
                )
            })}
        </div>
    )
}

export default Socials;