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

  constructor(name: string) {name}
  addParticipant(name: string): void {
    if (!this.ParticipantExist(name)) {
      this.participants.push({ name });
    }
  }
  private ParticipantExist(name: string): boolean {
    return this.participants.some(p => p.name === name);
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
  groups: Map<string, Group> = new Map();  // kolekcja grup;
  createGroup(name: string) {
    if (!this.groups.has(name)) {
      this.groups.set(name, new Group(name));
    }
  }
  addParticipantToGroup(groupName: string, participantName: string) {
    const group = this.groups.get(groupName);
    if (group) {
      group.addParticipant(participantName);
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
document.getElementById("addParticipantButton")?.addEventListener("click", () => {
  const groupName = document.getElementById("groupUsername")?.value;
  const participantName = document.getElementById("participantName")?.value;
  if(groupName && participantName){
    manager.createGroup(groupName);
    manager.addParticipantToGroup(groupName, participantName);
    updateParticipantList(groupName);
  }
});

document.getElementById("drawButton")?.addEventListener("click", () => {
  const groupName = document.getElementById("groupUsername")?.value;
  if(groupName){
    manager.drawForGroup(groupName);
    displayAssignments(groupName);
  }
});

// const manager = new SecretSantaManager;
// manager.createGroup("Grupa1");
// manager.addParticipantToGroup("Grupa1", "Szymon")
// manager.addParticipantToGroup("Grupa1", "Antek")
// //...
// manager.drawForGroup("Grupa1")
// console.log(`Wyniki dla: Grupa1`, manager.getGroupAssignment("Grupa1"))