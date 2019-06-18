Refinery::I18n.frontend_locales.each do |lang|
  I18n.locale = lang

  Refinery::User.find_each do |user|
    user.plugins.where(name: 'refinerycms-events').first_or_create(
      position: (user.plugins.maximum(:position) || -1) +1
    )
  end if defined?(Refinery::User)

  Refinery::Page.where(link_url: (url = "/events")).first_or_create(
    title: 'Events',
    deletable: false,
    menu_match: "^#{url}(\/|\/.+?|)$"
  ) do |page|
    Refinery::Pages.default_parts.each_with_index do |part, index|
      page.parts.build title: part[:title], slug: part[:slug], body: nil, position: index
    end
  end if defined?(Refinery::Page)
end
  
  Refinery::Events::Event.create(
    title: 'MAGIC Litter Fest',
    start: DateTime.now + 18.days,
    end: DateTime.now + 18.days + 1.hour,
    event_type: 'Meeting',
    address: '544 Main Street',
    city: 'Wilmington',
    state: 'MA',
    zipcode: '02130',
    location_name: 'Main street plaza')

  Refinery::Events::Event.create(
    title: 'Regional Planning Conference Survey Workshop Brown Bag Thing',
    start: DateTime.now + 21.days,
    end: DateTime.now + 21.days + 1.hour,
    event_type: 'Meeting',
    address: '60 Temple Place',
    city: 'Boston',
    state: 'MA',
    zipcode: '02111',
    location_name: 'MAPC')

  Refinery::Events::Event.create(
    title: '(NSPC) Breakfast & Lunch',
    start: DateTime.now + 15.days,
    end: DateTime.now + 15.days + 1.hour,
    event_type: 'Meeting',
    address: '380 Main Street',
    city: 'Stoneham',
    state: 'MA',
    zipcode: '02180',
    location_name: 'Town Hall')
