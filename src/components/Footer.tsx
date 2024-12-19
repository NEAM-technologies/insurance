import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-fit w-full md:py-5 my-6">
      {/* Contact Info */}
      <div className="md:h-96 max-w-6xl flex flex-col md:flex-row mx-auto md:mt-10 p-8">
        <div className="h-full w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold">You Insurance Agency</h2>
          <p className="text-lg">
            257 Timber Dr <br />
            Garner, NC 27529
          </p>
          <p className="mt-4 text-lg">
            <span className="font-bold"> Anthony You</span> <br />
            Agency Owner
          </p>
          <Link href="mailto:ayou@youinsuranceagency.com" className="text-lg">
            ayou@youinsuranceagency.com
          </Link>
          <div className="mt-4 text-lg">
            <span className="font-bold">Office Phone:</span> <br />
            <Link href="tel:9193410606" className="underline">
              919-341-0606
            </Link>
          </div>
          <p className="mt-4 text-lg">
            <span className="font-bold">Office Hours:</span> <br />
            Monday - Friday: <br/>8:30 AM to 5:30 PM
          </p>
        </div>

        {/* Map */}
        <div className="h-full w-full md:w-1/2 flex flex-col justify-end mt-14 md:mt-0">
          <div className="w-full flex items-center lg:justify-end gap-3 md:-mt-6 lg:mt-0 mb-4">
            <Link
              href="https://www.facebook.com/youinsuranceagency"
              target="blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebookicon.png"
                alt="Business Woman"
                height={35}
                width={35}
              />
            </Link>
            <Link
              href="https://www.instagram.com/insurewithyou/"
              target="blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagramicon.png"
                alt="Business Woman"
                height={40}
                width={40}
              />
            </Link>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.671208999865!2d-78.60746068497464!3d35.70346918018957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac597576317ccf%3A0xf1688db2c903007c!2s257%20Timber%20Dr%2C%20Garner%2C%20NC%2027529!5e0!3m2!1sen!2sus!4v1697808512955!5m2!1sen!2sus"
            title="Location Map"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
