"use client";
import { Certificate } from "@/app/certifications/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { formatDateWithoutDay } from "@/helpers/utility";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";


const CertificateCard = ({ index, certificate }: { index: number; certificate: Certificate }) => {
  return (
    <Card key={index} className="rounded-sm flex flex-col justify-between">
      <CardHeader className="p-3 pt-5">
        <CardTitle className="text-sm flex items-center gap-2">
          <Image
            src={certificate.providerImage}
            alt={certificate.provider}
            width={16}
            height={16}
          />
          {certificate.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 ps-4 pr-4">
        <Image
          src={certificate.image}
          alt={certificate.title}
          width={500}
          height={300}
          className="rounded mb-4"
        />
        <p>{certificate.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col text-xs p-3 pt-0 pb-5">
        <div className="relative w-full">
          <h3 className="mb-3 font-bold flex justify-between items-center w-full">
            Issued: {formatDateWithoutDay(new Date(certificate.issueDate))}
            {certificate.link && (
              <Link
                href={certificate.link}
                target="_blank"
                className="text-right w-[20px] h-[20px] rounded-sm bg-white 
                        hover:bg-secondary-default transition-all duration-500 flex 
                          justify-center items-center hover:rotate-45 mt-1"
              >
                <FaLink className="text-primary text-3xl font-bold p-1" />
              </Link>
            )}
          </h3>
        </div>

        <ul className="flex flex-wrap gap-2 text-left w-full">
          {certificate.skillsCovered.map((skill, index) => (
            <li
              key={index}
              className="inline-flex text-xs font-bold bg-secondary-default text-primary py-0.5 px-2 rounded"
            >
              {skill}
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
