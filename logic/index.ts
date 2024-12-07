

// Participant
  interface Participant {
    name: string;
  }
  
  interface Assignment {
    receiver: Participant;
    giver: Participant;
  }
  
  // Group
  class Group {
    private participants: Participant[] = [];
    private assignments: Assignment[] = [];
  
    constructor(name: string) {
        name;
    }
  
    addParticipant(name: string): void {
        // TODO: Dodać walidację czy ju taki nie istnieje w grupie
      if(!this.participants.some(p=> p.name === name)){
            this.participants.push({ name });
      }
    }

    draw() {
        const shuffla = [...this.participants].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < shuffla.length; i++) {
          const giver = shuffla[i];
          const receiver = shuffla[(i + 1) % shuffla.length]; // ostatni dostaje pierwszego
          this.assignments.push({ giver, receiver });
        }
      }
  
    getParticipants(): Participant[] {
      return this.participants
    }
    getAssignments(): Assignment[] {
      return this.assignments
    }
  }
  
    //Manager
    class SecretSantaManager {
        groups: Map<string,Group> = new Map();  // kolekcja grup;

        createGroup(name:string){
            this.groups.set(name, new Group(name));
        }

        addParticipantToGroup(groupName: string, participantName: string){
            const group = this.groups.get(groupName);
            const groupNameInput = <HTMLInputElement>document.getElementById("groupUsername");
            const participantNameInput = <HTMLInputElement>document.getElementById("participantName");
            
            const groupUsername = groupNameInput.value.trim();
            const participantList = participantNameInput.value.trim();
            //if(!groupName || !participantName){
              //  alert("Uzupełnij pola");
                //return;
            //}
            manager.addParticipantToGroup(groupUsername, participantName);
            updateParticipantList(groupUsername);
            participantNameInput.value = "";
            
            if (group){
                group.addParticipant(participantName);
            }
        }

        drawForGroup(groupName:string){
            const group = this.groups.get(groupName);

            if(group){
               group.draw(); 
            }
        }

        getGroupAssignment(groupName:string):Assignment[]{
            const group = this.groups.get(groupName);
            return group ? group.getAssignments(): [];
        }
   }

   function updateParticipantList(groupName: string){
    const participantList = document.getElementById("participantList");
    const group = manager.groups.get(groupName);

    if (participantList && group){
        participantList.innerHTML = "";
        group.getParticipants().forEach(participant => {
            const li = document.createElement("li");
            li.textContent = participant.name;
            participantList.appendChild(li);
        });
    }
   }
  
    const manager = new SecretSantaManager;

    manager.createGroup("Grupa1");

    manager.addParticipantToGroup("Grupa1", "Szymon")
    manager.addParticipantToGroup("Grupa1", "Antek")
    
    //...
  
    manager.drawForGroup("Grupa1")
  
    console.log(`Wyniki dla: Grupa1`, manager.getGroupAssignment("Grupa1"))