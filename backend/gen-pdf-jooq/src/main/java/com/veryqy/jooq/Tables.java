/*
 * This file is generated by jOOQ.
*/
package com.veryqy.jooq;


import com.veryqy.jooq.tables.Commodity;
import com.veryqy.jooq.tables.Contractor;
import com.veryqy.jooq.tables.Order;
import com.veryqy.jooq.tables.Row;
import com.veryqy.jooq.tables.User;

import javax.annotation.Generated;


/**
 * Convenience access to all tables in public
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.10.8"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Tables {

    /**
     * The table <code>public.commodity</code>.
     */
    public static final Commodity COMMODITY = com.veryqy.jooq.tables.Commodity.COMMODITY;

    /**
     * The table <code>public.contractor</code>.
     */
    public static final Contractor CONTRACTOR = com.veryqy.jooq.tables.Contractor.CONTRACTOR;

    /**
     * The table <code>public.order</code>.
     */
    public static final Order ORDER = com.veryqy.jooq.tables.Order.ORDER;

    /**
     * The table <code>public.row</code>.
     */
    public static final Row ROW = com.veryqy.jooq.tables.Row.ROW;

    /**
     * The table <code>public.user</code>.
     */
    public static final User USER = com.veryqy.jooq.tables.User.USER;
}