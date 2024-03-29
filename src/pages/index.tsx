import Head from 'next/head'

import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
        <div>
          <Link rel="stylesheet" href="/select-room" style={{margin:'45%',color:'blue',fontWeight:'bold'}}>select-room</Link>
          <br/>
          <Link rel="stylesheet" href="/game" style={{margin:'45%',color:'blue',fontWeight:'bold'}}>game</Link>
          <br/>
          <Link rel="stylesheet" href="/hello" style={{margin:'45%',color:'red',fontWeight:'bold'}}>hello</Link>
          <br />
          <Link rel="stylesheet" href="/login" style={{margin:'45%',color:'green',fontWeight:'bold'}}>login</Link>
          <br />
          <Link rel="stylesheet" href="/register" style={{margin:'45%',color:'blue',fontWeight:'bold'}}>register</Link>
        </div>
      </main>
    </>
  )
}
