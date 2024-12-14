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

  constructor(name: string) {}
  addParticipant(name: string): void {
    if (!this.ParticipantExist(name)) {
      this.participants.push({ name });
    }
  }
  private ParticipantExist(name: string): boolean {
    return this.participants.some(p => p.name === name);
  }
  draw() {
    this.assignments = [];
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
  groups: Map<string, Group> = new Map();  // kolekcja grup;
  createGroup(name: string) {
    if (!this.groups.has(name)) {
      this.groups.set(name, new Group(name));
    }
  }
  addParticipantToGroup(groupName: string, participantName: string) {
    const group = this.groups.get(groupName);
    if (group) {
      const currentParticipants = group.getParticipants();
      if(currentParticipants.length < 20){
        group.addParticipant(participantName);
      } else{
        alert("Maks 20 uczestników (20).")
      }
      this.updateDrawButton(groupName);
    } else {
      console.error(`Ta grupa ${groupName} nie istnieje :*`);
    }
  }

  drawForGroup(groupName: string) {
    const group = this.groups.get(groupName);
    if (group) {
      group.draw();
    } else {
      console.error(`Ta grupa ${groupName} nie istnieje :*`);
    }
  }

  getGroupAssignment(groupName: string): Assignment[] {
    const group = this.groups.get(groupName);
    return group ? group.getAssignments() : [];
  }
  
  updateDrawButton(groupName: string){
    const drawButton = document.getElementById("drawButton") as HTMLButtonElement;
    const group = this.groups.get(groupName);
    if(drawButton && group){
      const participantCount = group.getParticipants().length;
      if(participantCount < 3){
        drawButton.disabled = group.getParticipants().length < 3;
        drawButton.style.backgroundColor = "#b2222262";
      } else {
          drawButton.disabled = false;
          drawButton.style.backgroundColor = "#b22222";
      }
    } 
  }
}

function updateParticipantList(groupName: string) {
  const participantList = document.getElementById("participantList");
  const group = manager.groups.get(groupName);
  
  if (participantList && group) {
    participantList.innerHTML = "";
    group.getParticipants().forEach(participant => {
      const li = document.createElement("li");
      li.textContent = participant.name;
      participantList.appendChild(li);
    });
  }
}

function displayAssignments(groupName: string){
  const assignmentsResult = document.getElementById("assignmentsResult");
  const assignments = manager.getGroupAssignment(groupName);
  
  if(assignmentsResult){
    assignmentsResult.innerHTML="";
    assignments.forEach(assignment => {
      const p = document.createElement("p");
      p.textContent = `${assignment.giver.name} ➡️ ${assignment.receiver.name}`;
      assignmentsResult.appendChild(p);
    });
  }
}

const manager = new SecretSantaManager();

document.addEventListener("keydown", (event)=>{
  if(event.key === "Enter"){
    const groupName = (document.getElementById("groupUsername") as HTMLInputElement).value;
    const participantName = (document.getElementById("participantName") as HTMLInputElement).value;
    if(groupName && participantName){
    manager.createGroup(groupName);
    manager.addParticipantToGroup(groupName, participantName);
    updateParticipantList(groupName);
   }
  }
});
document.getElementById("addParticipantButton")?.addEventListener("click", () => {
  const groupName = (document.getElementById("groupUsername") as HTMLInputElement).value;
  const participantName = (document.getElementById("participantName")as HTMLInputElement).value;
  if(groupName && participantName){
    manager.createGroup(groupName);
    manager.addParticipantToGroup(groupName, participantName);
    updateParticipantList(groupName);
  }
});

document.getElementById("drawButton")?.addEventListener("click", () => {
  const groupName = (document.getElementById("groupUsername")as HTMLInputElement).value;
  if(groupName){
    const group = manager.groups.get(groupName);
    if(group){
      const participantAmount = group.getParticipants().length;
      if (participantAmount < 3){
        alert("Minimum 3 uczestników w grupie (3).");
        return;
      }
      manager.drawForGroup(groupName);
      displayAssignments(groupName);
    }
  }
}); 