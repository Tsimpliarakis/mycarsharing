<template>
  <div class="flex flex-center">
    <div class="instructions">
      <div
        class="text-subtitle2 text-center"
        style="margin-top: 10px; margin-bottom: 20px"
      >
        How does car sharing work?
      </div>
      <div class="text-caption">
        Peer-to-peer car sharing involves individuals renting out their personal
        vehicles to others when they're not using them, often facilitated by
        online platforms or apps. Owners list their cars on the platform,
        specifying availability, location, and rental terms. Renters can then
        search for available cars in their area, book them for specific time
        periods, and use them for their needs. Owners earn money from renting
        out their cars, while renters gain access to vehicles without the
        commitment of ownership. This model increases vehicle utilization and
        can provide additional income for car owners.
      </div>

      <div
        class="text-subtitle2 text-center"
        style="margin-top: 30px; margin-bottom: 20px"
      >
        How to Start Using MyCarSharing
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/usrimg.jpeg" />
        </q-avatar>
        1. Create Your Account
      </div>
      <div class="text-caption">
        Register for an account on MyCarSharing to get started. You'll need to
        provide your email address and create a password to access the platform.
        You'll receive a confirmation email to verify your account.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/setuppf.jpeg" />
        </q-avatar>
        2. Set Up Your Profile
      </div>
      <div class="text-caption">
        Fill out your profile with information about yourself, including your
        name, contact details, and profile picture. This helps build trust with
        other users on the platform and provides necessary information for
        renting or listing a car.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/uploadcar.jpeg" />
        </q-avatar>
        3. List Your Car (for Owners)
      </div>
      <div class="text-caption">
        If you want to rent out your car, go to the "My cars -> Add car"
        section. Provide details about your vehicle, including make, model,
        year, and any special features. Upload clear photos of your car and set
        your rental price and availability. You can also specify pickup and
        drop-off locations.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/searching.jpeg" />
        </q-avatar>
        4. Search for Cars (for Renters)
      </div>
      <div class="text-caption">
        Use the search function to find available cars in your area. You can
        filter results based on location, price, vehicle type, and other
        preferences. Browse through listings to find a car that suits your needs
        and budget.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/book.jpeg" />
        </q-avatar>
        5. Book a Car
      </div>
      <div class="text-caption">
        Once you've found a car you like, select the dates you want to rent it.
        Send a booking request to the owner, who will confirm the reservation.
        You may need to provide additional information or documents depending on
        the owner's requirements.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/communicate.jpeg" />
        </q-avatar>
        6. Communicate with the Owner
      </div>
      <div class="text-caption">
        Stay in touch with the car owner to coordinate details about the rental,
        such as pickup instructions, key exchange, and any special requests.
        Clear communication helps ensure a smooth rental experience for both
        parties.
      </div>
      <div class="text-caption">
        We are currently working on providing you with a messaging system to
        enrich your experience.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/carkey.jpeg" />
        </q-avatar>
        7. Pick Up the Car
      </div>
      <div class="text-caption">
        On the day of your reservation, meet the owner at the agreed-upon
        location to pick up the car. Complete any necessary paperwork, inspect
        the vehicle for pre-existing damage, and confirm the rental details
        before driving off.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/happy.jpeg" />
        </q-avatar>
        8. Enjoy Your Rental
      </div>
      <div class="text-caption">
        Use the car for your planned activities, whether it's running errands,
        going on a road trip, or simply exploring a new area. Take care of the
        vehicle and follow any guidelines set by the owner to ensure a positive
        experience.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/return.jpeg" />
        </q-avatar>
        9. Return the Car
      </div>
      <div class="text-caption">
        Return the car to the owner at the designated drop-off location at the
        end of your reservation. Make sure to refuel the car if needed and leave
        it in the same condition as when you picked it up. Complete any
        post-rental inspections or paperwork as required.
      </div>
      <div class="text-subtitle2">
        <q-avatar size="40px">
          <q-img src="/src/assets/review.jpeg" />
        </q-avatar>
        10. Leave a Review
      </div>
      <div class="text-caption">
        After the rental, share your feedback by leaving a review for the owner
        and the vehicle or vice versa. Rate your overall experience, highlight
        any positive aspects, and provide constructive criticism if needed.
        Reviews help build trust and improve the platform for all users.
      </div>
      <div class="text-subtitle2 text-center" style="margin-top: 30px">
        Tips for a Great Car Sharing Experience
      </div>
      <div class="text-caption">
        <div class="text-subtitle2">For Owners:</div>
        <div class="text-caption">
          Keep your car clean and well-maintained. Be clear and prompt in your
          communication with renters. Ensure your car is insured and meets all
          safety standards.
        </div>
        <div class="text-subtitle2">For Renters:</div>
        <div class="text-caption">
          Treat the car with respect, as if it were your own. Follow all traffic
          laws and the owner's specific instructions. Return the car on time and
          in the same condition you received it.
        </div>
        <div class="text-caption text-italic" style="margin-top: 30px">
          By following these steps, you can make the most out of MyCarSharing,
          whether you're looking to rent a car or earn extra income by sharing
          your vehicle.
        </div>
        <div class="flex flex-center">
          <q-img src="../assets/happysharing.png" class="happysharing" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.instructions {
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  width: 85%;
  max-width: 800px;
}

.text-caption {
  margin: 10px;
}

.happy {
  font: message-box;
  color: #458248;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 30px;
}

.happysharing {
  margin-top: 30px;
  margin-bottom: 15px;
  width: 80%;
  border-radius: 10px;
}
</style>
