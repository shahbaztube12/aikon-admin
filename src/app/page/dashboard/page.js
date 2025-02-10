import React from 'react';
import { BookOpen, Cloud, Flag, Folder, ShoppingBag, User } from "react-feather";
import Head from 'next/head';
import Image from 'next/image';
import bg2 from '@/img/img2.jpg';  // Ensure this is a valid import
import { CandyIcon, FolderCode } from 'lucide-react';

// Blog data
const BlogData = [
  {
    image: bg2,  // Image path from the public folder
    title: "Aikon Sports Sale",
    subtitle: "Exclusive Discounts, Shop Now!",
    description:
      "Welcome to Aikon Sports! We are dedicated to providing the best sports equipment and apparel for athletes of all levels. Our mission is to inspire and empower.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Aikon Sports Limited Offer",
    subtitle: "2 comments, 1 Like",
    description:
      "Explore Aikon Sports' exciting new arrivals! Take advantage of special discounts on select products. Hurry, the offer is limited!",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "New Year, New Gear!",
    subtitle: "2 comments, 1 Like",
    description:
      "Kickstart your fitness journey with top-of-the-line sports equipment. Enjoy unbeatable prices and exclusive deals at Aikon Sports.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Aikon Sports: The Best for Your Workout",
    subtitle: "2 comments, 1 Like",
    description:
      "Elevate your performance with Aikon Sports. Our latest collection of sports apparel and gear is designed for maximum comfort and durability.",
    btnbg: "primary",
  },
];

// Cards data for navigation links
const TopCards = [
  {
    icon: <BookOpen />,
    title: 'Blog',
    link: '/page/blog',
  },
  {
    icon: <ShoppingBag />,
    title: 'Product',
    link: '/page/product',
  },
  {
    icon: <Folder />,
    title: 'Category',
    link: '/page/Category',
  },
  {
    icon: <FolderCode />,
    title: 'Sub Category',
    link: '/page/sub-category',
  },
  {
    icon: <Cloud />,
    title: 'Order',
    link: '/page/order',
  },
  {
    icon: <Flag />,
    title: 'Banner',
    link: '/page/banner',
  },
  {
    icon: <User />,
    title: 'User',
    link: '/page/user',
  },
  {
    icon: <CandyIcon />,
    title: 'Coupon',
    link: '/page/coupon',
  },


];

function Dashboard() {
  return (
    <div className='py-4 px-4'>
      <Head>
        <title>Aikon Sports - Shop the Best Sports Gear</title>
        <meta name="description" content="Shop the latest sports gear at Aikon Sports!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TopCards.map((card, index) => (
            <div key={index} className="border m-2 p-4 justify-center bg-white text-black items-center rounded-lg shadow-md">
              <div className="card-body">
                <div className="m-2">{card.icon}</div>
                <h5 className="card-title text-xl font-semibold">{card.title}</h5>
                <a href={card.link} className="mt-2 text-md bg-purple-500 text-white p-1 rounded-md hover:underline">
                  Go to {card.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Blog Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BlogData.map((blg, index) => (
            <div className="m-2" key={index}>
              <div className="border p-4 rounded-lg shadow-md bg-white">
                <Image 
                  src={blg.image} 
                  alt={blg.title} 
                  width={500} // Adjust the width as needed
                  height={300} // Adjust the height as needed
                  className="w-full h-48 object-cover rounded-md"
                />
                <h5 className="mt-4 text-xl font-semibold">{blg.title}</h5>
                <p className="text-sm text-gray-500">{blg.subtitle}</p>
                <p className="mt-2">{blg.description}</p>
                <button className={`mt-4 px-4 py-2 text-white ${blg.btnbg === 'primary' ? 'bg-purple-500' : 'bg-gray-500'} rounded-lg`}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
