import React, { useState } from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import Image06 from '../../images/glo-log.png';
import Modal from '../modal';

function DashboardCard10() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const customers = [
    {
      id: '0',
      image: Image06,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      phone: '07044556677',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      phone: '07044556677',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      phone: '07044556677',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      phone: '07044556677',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: '🇬🇧',
      phone: '07044556677',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Customers</h2>
      </header>
<Modal showModal={showModal} setShowModal={setShowModal} title="KYC Image Verification" imageContext={image} />
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Profile Image</div>
                </th>
                 <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Proof of Identity</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Address</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Approve</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Reject</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        
                          <div className="p-2 whitespace-nowrap">
                            <img onClick={()=> {
                              setImage(customer.image)
                               setShowModal((prevState)=> !prevState)}} className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                       
                     
                      </td>
                       <td className="p-2 whitespace-nowrap">
                        
                          <div className="p-2 whitespace-nowrap">
                            <img onClick={()=> {
                              setImage(customer.image)
                               setShowModal((prevState)=> !prevState)}} className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                       
                     
                      </td>
                       <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-slate-800">{customer.name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.phone}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.location}</div>
                      </td>
                       <td className="p-2 whitespace-nowrap">
                        <button className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Approve</button>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <button className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Reject</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
