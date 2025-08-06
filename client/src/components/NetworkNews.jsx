import React from 'react'

function NetworkNews() {
  return (
   <div className="hidden lg:block lg:w-1/4">
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Network Highlights</h3>
                        {[
                            { title: "Weekly Tech Meetup", subtitle: "Tomorrow at 6:00 PM" },
                            { title: "New job openings in your network", subtitle: "3 new postings" },
                            { title: "2023 Industry Report", subtitle: "Download now" }
                        ].map((item, i) => (
                            <div className="flex items-center gap-3 mb-3" key={i}>
                                <img className="h-10 w-10 rounded-full" src="https://placehold.co/400x400" alt={item.title} />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Recently Viewed Profiles</h3>
                        {[
                            { name: "Lisa Thompson", role: "HR Manager" },
                            { name: "Robert Chen", role: "Senior Developer" }
                        ].map((user, i) => (
                            <div className="flex items-center gap-3 mb-3" key={i}>
                                <img className="h-10 w-10 rounded-full" src="https://placehold.co/400x400" alt={`Recently viewed ${user.name}`} />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
  )
}

export default NetworkNews
