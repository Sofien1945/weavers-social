export const imageSource = (user) => {
  if (user?.image) {
    return (
      <img
        className="w-12 h-12 rounded"
        src={user?.image?.url}
        alt="image preview"
        referrerPolicy="no-referrer"
      />
    )
  } else
    return (
      <img
        className="w-10 h-10 rounded-full"
        src={image ? image?.url : "/images/logo-weavers.png"}
        alt="username"
      />
    )
}
