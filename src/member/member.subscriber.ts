import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, LoadEvent, RemoveEvent } from 'typeorm';
import { TransactionStartEvent } from 'typeorm/subscriber/event/TransactionStartEvent';
import { TransactionCommitEvent } from 'typeorm/subscriber/event/TransactionCommitEvent';
import { TransactionRollbackEvent } from 'typeorm/subscriber/event/TransactionRollbackEvent';
import { Member } from './entities/member.entity';

@EventSubscriber()
export class MemberSubscriber implements EntitySubscriberInterface<Member> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Member;
    }

    beforeInsert(event: InsertEvent<Member>) {
        console.log(`BEFORE POST INSERTED: `, event.entity);
    }

    /**
     * Called after entity insertion.
     */
    afterInsert(event: InsertEvent<Member>) {
        console.log(`AFTER ENTITY INSERTED: `, event.entity);
    }

    /**
     * Called before entity update.
     */
    beforeUpdate(event: UpdateEvent<Member>) {
        // console.log(`BEFORE ENTITY UPDATED: `, event.entity);
    }

    /**
     * Called after entity update.
     */
    afterUpdate(event: UpdateEvent<Member>) {
        // console.log(`AFTER ENTITY UPDATED: `, event.entity);
    }

    /**
     * Called before entity removal.
     */
    beforeRemove(event: RemoveEvent<Member>) {
        // console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
    }

    /**
     * Called after entity removal.
     */
    afterRemove(event: RemoveEvent<Member>) {
        // console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
    }

    /**
     * Called before transaction start.
     */
    beforeTransactionStart(event: TransactionStartEvent) {
        // console.log(`BEFORE TRANSACTION STARTED: `);
    }

    /**
     * Called after transaction start.
     */
    afterTransactionStart(event: TransactionStartEvent) {
        // console.log(`AFTER TRANSACTION STARTED: `);
    }

    /**
     * Called before transaction commit.
     */
    beforeTransactionCommit(event: TransactionCommitEvent) {
        // console.log(`BEFORE TRANSACTION COMMITTED: `);
    }

    /**
     * Called after transaction commit.
     */
    afterTransactionCommit(event: TransactionCommitEvent) {
        // console.log(`AFTER TRANSACTION COMMITTED: `);
    }

    /**
     * Called before transaction rollback.
     */
    beforeTransactionRollback(event: TransactionRollbackEvent) {
        // console.log(`BEFORE TRANSACTION ROLLBACK: `);
    }

    /**
     * Called after transaction rollback.
     */
    afterTransactionRollback(event: TransactionRollbackEvent) {
        // console.log(`AFTER TRANSACTION ROLLBACK: `);
    }
}
