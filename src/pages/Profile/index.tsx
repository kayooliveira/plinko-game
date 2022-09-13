interface User {
  name: string
  profilePic: string
  uid: string
  currentBalance: number
}

export function Profile(user: User) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-primary p-2 px-6 text-text">
      <img
        src={user.profilePic}
        alt={user.name + ' Avatar'}
        className="mx-auto w-32 rounded-full"
      />
      <span className="text-center text-2xl font-bold">{user.name}</span>
      <span className="text-center text-xl font-bold">
        {user.currentBalance} PPs
      </span>
    </div>
  )
}
