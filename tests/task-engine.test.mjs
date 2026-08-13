import assert from 'node:assert/strict';
import { moveTaskToToday, normalizeTask } from '../task-engine.mjs';

const completed=normalizeTask({id:'done',title:'Closed',status:'done',createdDate:'2026-08-13'},'2026-08-14T08:00:00Z','2026-08-14');
assert.equal(completed.source,'Manual');
assert.equal(completed.history.at(-1).event,'Completed');

const future=moveTaskToToday({id:'future',status:'open',movedToHuddleDate:'2026-08-15'},'2026-08-14','2026-08-14T08:00:00Z');
assert.equal(future.moved,false);

const moved=moveTaskToToday({id:'carry',status:'open',movedToHuddleDate:'2026-08-13',history:[]},'2026-08-14','2026-08-14T08:00:00Z');
assert.equal(moved.moved,true);
assert.equal(moved.task.source,"Today's Work");
assert.equal(moved.task.history.at(-1).event,'Moved to Today’s Work');

console.log('TalentisOS task-engine checks passed');
