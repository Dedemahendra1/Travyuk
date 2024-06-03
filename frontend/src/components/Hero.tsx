import { Link } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "./ui/button"


const Hero = () => {
  return (
    <>
     <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Life is Too Short For a Wide And{' '}
            <span className='text-blue-600'>
              Beautiful World
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to Travyuk. Enjoy Your Tour and Hotels With Heavenly
            experience you've never had
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              to='/products'
              className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Hero