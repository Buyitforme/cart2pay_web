import React from 'react'
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router'
import { Heading } from './Typography'
import { ArrowLeft } from 'lucide-react'


interface HeaderProps {
  label: string
}
const GoBack: React.FC<HeaderProps> = ({ label }) => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
       <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
        </button>
 <Heading size="2xl" weight="bold" className="mb-6">
          {label}
        </Heading>    </div>
  )
}

export default GoBack
